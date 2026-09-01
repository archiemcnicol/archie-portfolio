import { PageShell } from "@/components/page-shell";
export default function PhotographyPage(){return <PageShell eyebrow="Photography" title="The visual archive, curated." intro="Travel, events, lifestyle and commercial photography presented as projects rather than an endless image dump." blocks={[
{title:"Travel",copy:"Country- and date-led stories drawn from the existing photography archive."},
{title:"Events",copy:"Festivals, nightlife, live events and documentary-style coverage."},
{title:"Lifestyle / fashion",copy:"Portraits, styling, streetwear and creator-led visual work."},
{title:"Commercial",copy:"Business, hospitality and brand photography that can also surface inside the Business section."},
{title:"Client galleries",copy:"Later: private galleries assigned to individual clients rather than publicly indexed."},
{title:"Enquiries",copy:"Photography availability and project enquiries.",href:"/contact"}
]}/>}
