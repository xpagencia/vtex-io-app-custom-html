import CustomHtmlContent  from "./CustomHtmlContent"

export default function ServerDateTime() {
  const dateTime = new Date()
  const date = dateTime.toISOString().split('T')[0];
  const time = dateTime.toTimeString().split(' ')[0];
  const dateTimeFormat = `${date} ${time}`;

  return CustomHtmlContent({ htmlText:`<script type="text/javascript">serverDateTime = "${dateTimeFormat}"</script>`})
}
