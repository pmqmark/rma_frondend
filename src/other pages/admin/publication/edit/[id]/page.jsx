import PNEditPage from "@/components/Admin/Publications-NewsLetter/PNEditPage"

const page = ({params}) => {
  const {id} = params;

  return (
   <>
    <PNEditPage name="publication" id={id} />
   </>
  )
}

export default page