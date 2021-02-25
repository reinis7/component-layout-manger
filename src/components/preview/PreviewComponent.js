import React from 'react'

export default function PreviewComponent({ type, ...rest }) {
    let render_comp = '<div/>'
    switch (type) {
        case 'video':
            render_comp = <video width="100%" height="100%" controls>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
            </video>
            break;
        case 'link':
            render_comp = <a to="https://www.w3schools.com/"> W3School</a>
            break;
        case 'text':
            render_comp = <span> W3School</span>
            break;
        case 'image':
            render_comp = <img src="https://www.w3schools.com/html/img_chania.jpg" alt="Flowers in Chania" width="100%" height="100%" />
            break;
        case 'custom_html':
            render_comp = <span> W3School</span>
            break;
    }
    return render_comp;

}
