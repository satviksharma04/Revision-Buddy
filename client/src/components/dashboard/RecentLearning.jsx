const RecentLearning = () => {

const items=[

{

title:"Operating Systems",

type:"PDF"

},

{

title:"DBMS",

type:"Topic"

}

];

return(

<div
className="
mt-8
bg-white
border
rounded-xl
"
>

<h2
className="
text-lg
font-semibold
p-6
border-b
"
>

Recent Learning

</h2>

{
items.map(item=>(

<div
className="
flex
justify-between
items-center
px-6
py-4
hover:bg-gray-50
cursor-pointer
"
>

<div>

<p
className="
font-medium
"
>

{item.title}

</p>

<p
className="
text-sm
text-gray-500
"
>

{item.type}

</p>

</div>

<span>

</span>

</div>

))
}

</div>

);

};

export default RecentLearning;