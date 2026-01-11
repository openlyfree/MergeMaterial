const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${Bun.env.GEMINI_API_KEY}`;
import projects from '../src/lib/projects.json';
console.log();

const ai_prompt = `
Generate 50 intermediate coding project ideas as a JSON array.

Requirements:

Tone: Focus on modern, "indie-hacker" style projects (Micro-SaaS, CLI tools, API mashups, and developer utilities).

Difficulty: Use an integer between 1 and 5 as in stars.

Stack: The stack must be a JSON array of strings (e.g., ["Svelte", "Bun", "SQLite"]).

Schema: Use this exact JSON format: [ { "id": number incrementing from ${projects.at(projects.length - 1)?.id}, "title": string, "description": string, "difficulty": number, "stack": [string, string, string] } ]

Output Format: Return only the raw JSON array. Do not use Markdown code blocks, do not use bold text, and do not include any introductory or concluding prose.

Constraints: No trivial CRUD apps. Every project must include an external API, a specific library, or a unique hardware/browser integration.
`;

async function generate() {
	console.log('Fetching from Gemini...');

	const payload = {
		contents: [
			{
				parts: [
					{
						text: ai_prompt
					}
				]
			}
		],
		generationConfig: {
			responseMimeType: 'application/json'
		}
	};

	const response = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});

	const result = await response.json();

	if (result.error) {
		console.error('API Error:', JSON.stringify(result.error, null, 2));
		return;
	}

	const content = result.candidates[0].content.parts[0].text;
	await Bun.write('./src/lib/projects.json', content);
	console.log('Done! projects.json is refreshed.');
}

generate();
