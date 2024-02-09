export const extractLink = (text: string) => {
  const regex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*|www\.[^\s/$.?#].[^\s]*/gi;
  const newText = text.replace(
    regex,
    (match) =>
      `<a href="${match}" class="hover:underline" target="_blank">${match}</a>`
  );

  return newText;
};
