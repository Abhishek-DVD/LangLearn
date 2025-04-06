import { CircularProgress } from "@mui/material"

const Loader = () => {
  return (
    <div style={{
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <CircularProgress/>
    </div>
  )
}

export default Loader