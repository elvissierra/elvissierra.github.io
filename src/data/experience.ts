export interface Role {
	domain: string;
	role: string;
	company: string;
	dates: string;
	focus: string;
	bullets: string[];
}

// Bullets are kept verbatim from the resume. Most recent role first.
export const experience: Role[] = [
	{
		domain: 'AI & Data Engineering',
		role: 'Quality Analyst',
		company: 'Apple Maps',
		dates: 'April 2025 – Present',
		focus: 'AI agents, ETL & internal reporting',
		bullets: [
			'Designed and shipped 7 internal AI agents and reusable skills spanning professional writing, repository analysis, automation review, KPI identification, structured brainstorming, and spreadsheet and slide-deck generation, cutting an estimated 4 hours of manual work per day across the team.',
			'Own the technical direction end to end, from problem framing and agent design through iteration in production, and lead enablement by demoing tools and spreading AI workflow patterns the rest of the team now reuses.',
			'Own ETL pipelines that ingest file-based and relational inputs, run Python and Pandas transformations, and load structured tables built for recurring reporting and ad hoc analysis.',
			'Consolidated fragmented scripts into a modular Python ETL package with defined entry points, schema validation, quality enforcement, and stage-level logging, so a failure traces to the exact stage that caused it.',
			'Designed LLM-assisted workflows for semi-structured reporting inputs, then built the post-processing layer that validates and corrects those outputs against the relational data model. The model is the check, not the model output.',
			'Automated recurring reporting with Airflow-scheduled jobs that query analytical tables, compute aggregates, and populate presentation templates, eliminating 16 hours per week of manual reporting.',
			'Partnered with reporting and operations stakeholders to define KPIs, calculation logic, and refresh cadence, so pipeline output matches the logic the decision is actually reasoned with.',
		],
	},
	{
		domain: 'Full-Stack & Backend',
		role: 'Software Engineer',
		company: 'Freelance',
		dates: 'March 2024 – January 2025',
		focus: 'Backend & AI integration',
		bullets: [
			'Designed a multi-tenant permission model for a collaborative media platform, layering org/team approval gates, scoped ORM query paths, and explicit object-level ownership checks so isolation held at three independent points instead of one filter a future change could quietly break.',
			'Integrated an API-backed AI assistant into onboarding flows, persisting request and response metadata in relational tables to drive in-app guidance.',
			'Chose server-side revocable tokens (Knox) over stateless JWTs so an org admin revoking a member\'s access took effect immediately, not on the token\'s own schedule. For a B2B tool, access control has to be instant.',
			'Designed normalized relational schemas with the right keys, indexes, and constraints, maintained through migrations as the model evolved, then cut response times on heavy read paths by profiling query plans and adding targeted single and composite indexes.',
			'Ran a self-directed audit of the codebase against its own documentation before a technical review and found a live bug in the uploads endpoint. Fixed it, and adopted "verify against source, not docs" as a habit going forward.',
		],
	},
	{
		domain: 'Search & Backend Systems',
		role: 'Senior Backend Engineer',
		company: 'ThinkOnward',
		dates: 'September 2022 – February 2024',
		focus: 'Backend systems & data flows',
		bullets: [
			'Built an async, event-driven ingestion pipeline where Lambda parsed S3 files, extracted structured fields, and indexed 100K documents into OpenSearch, with a field-mapping redesign that prevented drift and preserved lineage.',
			'Cut query time on core reporting endpoints from 8 seconds to under 1 second by redesigning index mappings and query shapes.',
			'Led zero-to-one ("moonshot") system design in a startup, taking ambiguous product goals and turning them into technical roadmaps with real boundaries, then holding engineering, product, and customer-facing teams aligned as the architecture moved.',
			'Built a geospatial polygon system tied to the OpenSearch index for well-location queries.',
			'Worked directly with product and customers to find real use cases, shaped LLM-backed features and backend systems around what those cases actually needed, and fed interaction data back into the next iteration.',
			'Wrote the backend documentation and API specs that laid out data flows, contracts, and failure modes for teams who weren\'t in the room when the decisions were made.',
			'Ran containerized services in a startup environment, owning AWS infrastructure and Git-based CI/CD, and kept rapid iteration from costing system stability.',
		],
	},
	{
		domain: 'Backend & Data Engineering',
		role: 'Software Engineer',
		company: 'Freelance',
		dates: 'August 2020 – September 2022',
		focus: 'Backend & data engineering',
		bullets: [
			'Delivered backend and data engineering for small clients and early-stage products, building internal tooling and pipelines in Python, Django, and AWS.',
		],
	},
	{
		domain: 'Performance & Analytics',
		role: 'Team Lead / Software Engineer',
		company: 'Caterpillar Inc.',
		dates: 'March 2018 – August 2020',
		focus: 'Performance management systems',
		bullets: [
			'Designed and built a performance-management system on a REST API tied to relational databases, so raw data points could be ingested once and viewed as daily and weekly aggregates and trend lines.',
			'Used the metrics and query output to recommend workflow changes, then measured the effect on throughput and utilization over time, closing the loop between what operations did and what leadership saw.',
			'Wrote the core queries and transformations behind the KPIs, found the bottlenecks in the data, and fed the charts and dashboards operations leadership used to allocate time, work, and resources.',
			'Ran root cause analysis through KPI decomposition, trend analysis, and anomaly detection, then recommended workflow changes: a 65% improvement in measured output quality and a 50% cut in rework resource usage.',
		],
	},
];
