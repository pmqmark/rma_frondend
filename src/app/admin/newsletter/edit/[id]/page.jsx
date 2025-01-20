import PNEditPage from "@/components/Admin/Publications-NewsLetter/PNEditPage"


const page = ({params}) => {
  const {id} = params;

  return (
   <>
    <PNEditPage name="newsletter" id={id} />
   </>
  )
}

export default page