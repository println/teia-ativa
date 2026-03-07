import capitalize from "@shared/mixins/capitalize";
import { NAMES } from './names.config';

const toPath = (label: string) => (label ? `/${label}` : '');
const toTitle = (label: string) => capitalize(label.replace('-', ' '));
const makeTitle = (label: string) => ({
    id: label,
    title: toTitle(label),
});
const makePath = (label: string, ...parents: string[]) => ({
    ...makeTitle(label),
    path: toPath(label),
    fullPath: parents.map((p) => toPath(p)).join('') + toPath(label),
});

export const ROUTES = {
    home: {
        ...makeTitle(NAMES.BASIC_PAGES.home),
        path: '/',
        fullPath: '/',
    },
    organization: makePath(NAMES.BASIC_PAGES.organization),
    education: makePath(NAMES.BASIC_PAGES.education),
    public_management: makePath(NAMES.BASIC_PAGES.public_management),
    about: makePath(NAMES.BASIC_PAGES.about),
    services: makePath(NAMES.BASIC_PAGES.services),
    contact: makePath(NAMES.BASIC_PAGES.contact),
    error: makePath(NAMES.ERROR_PAGES.error),
};
