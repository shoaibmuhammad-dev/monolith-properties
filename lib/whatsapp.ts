import { siteConfig } from "@/data/site";

type Vars = Record<string, string>;

export function fillTemplate(template: string, vars: Vars): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function buildWhatsAppLink(message: string, number: string = siteConfig.whatsapp.number) {
  return `https://wa.me/${digits(number)}?text=${encodeURIComponent(message)}`;
}

/** Generic message for the current route. Property pages override it with getPropertyMessage(). */
export function getPageMessage(pathname: string): string {
  const { messages } = siteConfig.whatsapp;
  const vars = { name: siteConfig.name };
  if (pathname.startsWith("/properties")) return fillTemplate(messages.properties, vars);
  if (pathname === "/contact") return fillTemplate(messages.contact, vars);
  return fillTemplate(messages.generic, vars);
}

export function getPropertyMessage(title: string, path: string): string {
  return fillTemplate(siteConfig.whatsapp.messages.property, {
    name: siteConfig.name,
    title,
    url: `${siteConfig.url}${path}`,
  });
}

export function getAgentMessage(agentName: string): string {
  return fillTemplate(siteConfig.whatsapp.messages.agent, {
    agent: agentName,
    name: siteConfig.name,
  });
}
