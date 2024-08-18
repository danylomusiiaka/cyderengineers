import Alert from "@mui/material/Alert";

export default function ServerError() {
  return (
    <Alert severity='warning' sx={{ padding: "10px 20px", fontFamily: "Montserrat" }}>
      Сервіс тимчасово недоступний через технічні проблеми. Приносимо вибачення
    </Alert>
  );
}
