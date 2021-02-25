import React from 'react'
import { IMAGE_LABEL, VIDEO_LABEL, LINK_LABEL, TEXT_LABEL, CUSTOM_HTML_LABEL } from 'helper/commonNames'

export default function PreviewComponent({ type, ...rest }) {
    let render_comp = '<div/>'
    switch (type) {
        case VIDEO_LABEL:
            render_comp = <video width="100%" height="100%" controls>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
            </video>
            break;
        case LINK_LABEL:
            render_comp = <a href="https://www.w3schools.com/"> W3School</a>
            break;
        case TEXT_LABEL:
            render_comp = <span> W3School</span>
            break;
        case IMAGE_LABEL:
            render_comp = <img src="https://www.w3schools.com/html/img_chania.jpg" alt="Flowers in Chania" width="100%" height="100%" />
            break;
        case CUSTOM_HTML_LABEL:
            render_comp = <span> W3School</span>
            break;
        default:
            break;
    }
    return render_comp;

}
