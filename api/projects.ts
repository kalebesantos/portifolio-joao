import type { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_REPO = 'JoaoFerrari56/portifolio-joao';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PROJECTS_FILE_PATH = 'projects.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'GitHub token not configured' });
  }

  try {
    if (req.method === 'GET') {
      // Buscar projetos do GitHub
      const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${PROJECTS_FILE_PATH}`, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      const projects = JSON.parse(content);

      return res.status(200).json(projects);
    }

    if (req.method === 'PUT') {
      // Primeiro, buscar o SHA atual do arquivo
      const getResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${PROJECTS_FILE_PATH}`, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!getResponse.ok) {
        throw new Error(`Failed to get file SHA: ${getResponse.status}`);
      }

      const fileData = await getResponse.json();
      const sha = fileData.sha;

      // Atualizar o arquivo
      const content = Buffer.from(JSON.stringify(req.body, null, 2)).toString('base64');

      const updateResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${PROJECTS_FILE_PATH}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update projects via admin panel',
          content: content,
          sha: sha,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error(`Failed to update file: ${updateResponse.status}`);
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}