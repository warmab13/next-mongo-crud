export default function HomePage() {
  return (
    <div>HomePage</div>
  )
}


export async function getServerSideProps(){
  const res = await fetch('http://localhost:3000/api/tasks');
  const tasks = await res.json();
  console.log("🚀 ~ file: index.js:9 ~ getServerSideProps ~ tasks", tasks)
  return {
    props: {}
  }
}