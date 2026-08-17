const EmptyState = ({
title,
description,
button
})=>{

return(

<div
className="
border
rounded-xl
bg-white
text-center
py-16
"
>

<h2
className="text-lg font-semibold"
>

{title}

</h2>

<p
className="mt-2 text-gray-500"
>

{description}

</p>

<div className="mt-6">

{button}

</div>

</div>

);

};

export default EmptyState;