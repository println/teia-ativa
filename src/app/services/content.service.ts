import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import matter from 'gray-matter';
import { marked, Token, Tokens } from 'marked';

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    constructor(private http: HttpClient) { }

    getContent<T>(path: string): Observable<T> {
        return this.http.get(path, { responseType: 'text' }).pipe(
            map(text => {
                const parsed = matter(text);
                const data = parsed.data as any; // Start with front-matter (e.g. eyebrow)

                const tokens = marked.lexer(parsed.content);

                // Initialize structure
                data.hero = {};
                data.comparison = { negative: {}, positive: {} };
                data.differentiators = [];

                let currentSection = '';

                for (let i = 0; i < tokens.length; i++) {
                    const token = tokens[i];

                    // Hero: H1 -> Title, Next P -> Description
                    if (token.type === 'heading' && token.depth === 1) {
                        data.hero.title = marked.parseInline(token.text);
                        // Look ahead for description
                        if (tokens[i + 1] && tokens[i + 1].type === 'paragraph') {
                            data.hero.description = (tokens[i + 1] as Tokens.Paragraph).text;
                        }
                    }

                    // Main Title: H2 -> Title, Next P -> Subtitle
                    if (token.type === 'heading' && token.depth === 2 && token.text === 'Cultura Ativa') { // Or just first H2
                        data.title = token.text;
                        if (tokens[i + 1] && tokens[i + 1].type === 'paragraph') {
                            data.subtitle = (tokens[i + 1] as Tokens.Paragraph).text;
                        }
                    }

                    // Lists Sections (H3 triggers content mode)
                    if (token.type === 'heading' && token.depth === 3) {
                        currentSection = token.text;

                        // Negative Comparison Title
                        if (currentSection === 'O Custo da Inação') {
                            data.comparison.negative.title = currentSection;
                        }
                        // Positive Comparison Title
                        if (currentSection === 'O ROI da Cultura Ativa') {
                            data.comparison.positive.title = currentSection;
                        }
                    }

                    if (token.type === 'list') {
                        const listItems = (token as Tokens.List).items;

                        if (currentSection === 'Benefícios') {
                            data.differentiators = listItems.map(item => {
                                // Expected format: "**icon: Title** Description"
                                // Clean parsing from text
                                const fullText = item.text;
                                // Regex to capture icon, title, description
                                // matches: **icon: Title** Description
                                const match = fullText.match(/\*\*(.*?):\s*(.*?)\*\*\s*([\s\S]*)/);

                                if (match) {
                                    return {
                                        icon: match[1].trim(),
                                        title: match[2].trim(),
                                        description: match[3].trim()
                                    };
                                }
                                return { title: 'Parse Error', description: fullText };
                            });
                        } else if (currentSection === 'O Custo da Inação') {
                            data.comparison.negative.items = listItems.map(item => this.parseSimpleListItem(item.text));
                        } else if (currentSection === 'O ROI da Cultura Ativa') {
                            data.comparison.positive.items = listItems.map(item => this.parseSimpleListItem(item.text));
                        }
                    }

                    // Closing: Blockquote
                    if (token.type === 'blockquote') {
                        // Join all text in blockquote
                        data.comparison.closing = marked.parseInline((token as Tokens.Blockquote).text);
                    }
                }

                return data as T;
            })
        );
    }

    private parseSimpleListItem(text: string) {
        // Expected: "**Title** Description"
        const match = text.match(/\*\*(.*?)\*\*\s*([\s\S]*)/);
        if (match) {
            return {
                title: match[1].trim(),
                description: match[2].trim()
            };
        }
        return { title: '', description: text };
    }
}
