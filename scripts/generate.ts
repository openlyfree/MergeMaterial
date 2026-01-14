const API_KEY = Bun.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
import projects from '../src/lib/projects.json';

async function generate() {
	if (!API_KEY) {
		console.error('❌ GEMINI_API_KEY is not set!');
		process.exit(1);
	}

	const lastId = projects.at(-1)?.id || 0;

	const payload = {
		contents: [
			{
				parts: [
					{ text: `Generate 20 intermediate coding project ideas. Start IDs from ${lastId + 1}.` }
				]
			}
		],
		generationConfig: {
			responseMimeType: 'application/json',
			// 2026 Pro-Tip: Force the schema so the AI doesn't hallucinate prose
			responseSchema: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: { type: 'number' },
						title: { type: 'string' },
						description: { type: 'string' },
						difficulty: { type: 'number' },
						stack: { type: 'array', items: { type: 'string' } }
					},
					required: ['id', 'title', 'description', 'difficulty', 'stack']
				}
			}
		}
	};

	const response = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		const text = await response.text();
		console.error(`HTTP Error ${response.status}:`, text);
		process.exit(1);
	}

	const result = await response.json();
	const content = result.candidates[0].content.parts[0].text;

	await Bun.write('./src/lib/projects.json', content);
	console.log('✅ projects.json updated successfully.');
}

generate();
