export default interface JobMail {
  key: string;
  handle({ data }: any): void;
}
