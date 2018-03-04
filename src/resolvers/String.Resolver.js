export default function StringResolver(options = {
  characters: 10,
  characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' 
}) {
  const { characters, characterSet } = options;
  let text = '';
  for (var i = 0; i < characters; i++) {
    text += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
  }

  return text;
}
