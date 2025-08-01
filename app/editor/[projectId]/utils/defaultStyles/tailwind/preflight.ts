export const preflightStyles = `
        /* Add your preflight CSS here */
        *,
        ::after,
        ::before,
        ::backdrop,
        ::file-selector-button {
            margin: 0;
            padding: 0;
        }
        
        *,
        ::after,
        ::before,
        ::backdrop,
        ::file-selector-button {
            box-sizing: border-box;
            border: 0 solid;
        }

        h1, h2, h3, h4, h5, h6 {
            font-size: inherit;
            font-weight: inherit;
        }

        ol, ul, menu {
            list-style: none;
        }

        img, svg, video, canvas, audio, iframe, embed, object {
            display: block;
            vertical-align: middle;
        }

        img, video {
            max-width: 100%;
            height: auto;
        }

        svg {
            width: 0px;
            height: 0px;
        }
    `;
