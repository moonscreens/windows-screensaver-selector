let lastID = 0;

export default function (prefix = 'generated_uid_') {
	return `${prefix}${lastID++}`;
}