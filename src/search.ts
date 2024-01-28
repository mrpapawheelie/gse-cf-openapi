import { OpenAPIRoute, Query } from "@cloudflare/itty-router-openapi";

interface GoogleSearchResultItem {
    title: string;
    snippet: string;
    link: string;
}

interface GoogleSearchResponse {
    items: GoogleSearchResultItem[];
}

export class GetSearch extends OpenAPIRoute {
    static schema = {
        tags: ['Search'],
        summary: 'Search the web using Google Programmable Search Engine',
        parameters: {
            q: Query(String, {
              description: 'The query to search for',
              default: 'cloudflare workers'
            }),
          },
        responses: {
            '200': {
                description: 'Successful response',
                schema: {
                    results: [
                        {
                            title: 'Example Title',
                            snippet: 'Example snippet of the search result.',
                            link: 'https://www.example.com',
                        }
                    ]
                },
            },
        },
    }

    async handle(request: Request, env, ctx) {
        // Parse the URL from the request to get the query parameters
        const url = new URL(request.url);
        const queryParams = new URLSearchParams(url.search);

        // Extract the 'q' query parameter
        const query = queryParams.get('q');

        // Check if 'q' is present and valid
        if (!query || query.trim().length === 0) {
            console.log('Query parameter "q" is empty or contains only whitespace.');
            return new Response('Query parameter "q" cannot be empty.', { status: 400 });
        }

        // Proceed with the API call using the 'query' variable
        const apiKey = env.GSE_API_KEY; // Use your actual API Key
        const searchEngineId = env.SEARCH_ENGINE_ID; // Use your actual Search Engine ID
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

        const resp = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'SearchAI - Cloudflare Workers ChatGPT Plugin Example'
            }
        });

        if (!resp.ok) {
            return new Response(await resp.text(), { status: resp.status });
        }

        const json = await resp.json() as GoogleSearchResponse;
        const results = json.items.map(item => ({
            title: item.title,
            snippet: item.snippet,
            link: item.link
        }));

        return new Response(JSON.stringify({ results }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
}
