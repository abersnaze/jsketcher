const namePattern = /^[a-z]+$/i;

export default function (data, fileName) {
  console.log("exportTextData", data, fileName);

  var name = '';
  var message = "What is your first name"
  while (!namePattern.test(name)) {
    name = prompt(message, name);
    message = message + ". (Use only letters)";
  }

  if (name === null) {
    return;
  }

  fetch('/upload/' + name + '/' + fileName, {
    headers: {
      'Content-Type': 'text/plain'
    },
    method: "POST",
    body: data
  });
};
