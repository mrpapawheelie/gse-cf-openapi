import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { GetSearch } from "./search";

export const router = OpenAPIRouter({
	schema: {
		info: {
			title: 'Google Search API',
			description: 'A plugin that allows the user to search the web using Google Programmable Search Engine through ChatGPT',
			version: '0.0.1',
		},
		servers: [
			{
			  url: "https://wagmi.cooks.dev",
			  description: "Main API server",
			},
		],
	},
	docs_url: '/',
	aiPlugin: {
		name_for_human: 'Google Web Search',
		name_for_model: 'google_web_search',
		description_for_human: "Google Web Search plugin for ChatGPT.",
		description_for_model: "You can search the web using Google Programmable Search Engine with this plugin.",
		contact_email: 'papa@cooks.dev',
		legal_info_url: 'https://terms.cooks.dev/',
		logo_url: 'https://cdn.cooks.dev/assets/cooks-dev-icon.jpg',
	},
})

router.get('/search', GetSearch) // Use your Google Search function here

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

export default {
	fetch: router.handle
}
