import { country } from "./country";

export interface settings {
    terms_of_use: string,
    privacy_policy: string,
    storepolicy: string,
    is_loading_page: boolean,
    title: string,
    appicon: string,
    applogo: string,
    credit_builder: boolean,
    payment_currency: string,
    is_allowed_to_buy: boolean,
    countries: country[],
    social_links: {
        facebooklink: string,
        instagramlink: string,
        linkedinlink: string,
        twitterlink: string,
        youtubelink: string
    }
}