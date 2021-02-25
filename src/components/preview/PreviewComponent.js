import React from 'react'

export default function PreviewComponent({ id, ...rest }) {
    if (rest.static) {
        return <span
            className="text"
            title="This item is static and cannot be removed or resized."
        >
            Static - {id}
        </span>
    } else {
        return <span className="text">{id}</span >
    }

}
