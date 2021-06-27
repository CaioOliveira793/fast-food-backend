export interface MailAddress {
	name: string;
	email: string;
}

export interface Mail {
	from: MailAddress;
	to: MailAddress;
	title: string;
	body: string;
}

export abstract class MailService {
	public abstract sendMail(mail: Mail): Promise<void>;
}
