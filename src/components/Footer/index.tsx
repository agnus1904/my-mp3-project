import React from 'react';

interface FooterProps{
}

const defaultProps : FooterProps = {
}

const Footer:React.FC<FooterProps> =(props) :React.ReactElement => {

    // const {} = props;

    return (
        <div>
            This is Footer Page
        </div>
    );
};

Footer.defaultProps = defaultProps;

export default Footer;