import Alert from "@mui/material/Alert";

export default function ServerError() {
  return (
    <Alert severity='warning' sx={{ padding: "10px 20px" }}>
      Сервіс тимчасово недоступний через технічні проблеми. Приносимо вибачення
    </Alert>
  );
}
