import React, { Children } from 'react'

export default function Wrapper({ child }) {
    const style = {
        border: '2px solid black',
        padding: 16,
    };
    return (
        <div style = {style}>
            {child}
        </div>
    )
}
