const PageHeader = ({
    title,
    subtitle,
    action
}) => {

    return (

        <div
            className="
flex
items-center
justify-between
mb-8
">

            <div>

                <h1
                    className="
text-2xl
font-semibold
"
                >

                    {title}

                </h1>

                <p
                    className="
text-gray-500
mt-1
"
                >

                    {subtitle}

                </p>

            </div>

            {action}

        </div>

    );

};

export default PageHeader;