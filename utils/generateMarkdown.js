// TODO: Create a function to generate markdown for README
function generateMarkdown(data, badge) {
  // generating table of contents based on returned data from prompts

let contents = `## Table of Contents  
`;
  if (data.features || data.technologies || data.dependancies) {
    contents += `* [Details](#details)  
`;
  }
  if (data.features) {
    contents += `       * [Features](#features)  
`;
  }
  if (data.technologies) {
    contents += `       * [Technologies](#technologies)  
`;
  }
  if (data.dependencies) {
    contents += `       * [Dependencies](#dependencies)  
`;
  }
  if (data.installation) {
    contents += `* [Installation](#installation)  
`;
  }
  if (data.usage) {
    contents += `* [Usage](#usage)  
`;
  }
  if (data.contributing) {
    contents += `* [Contributing](#contributing)  
`;
  }
  if (data.tests) {
    contents += `* [Tests](#tests)  
`;
  }
  if (data.github || data.email) {
    contents += `* [Questions](#questions)  
`;
  }

  contents += `* [Credits](#credits)  
`;

  //generating head
  let mdHead = `# ${data.title}  
${badge}  
## Description  
${data.description}  
`;

  // add generated head and ToC
  let mdTop = (mdHead += contents);

  //generate sections and their content (if they exist)
  let mdBody = `----  
`;
  if (data.features || data.technologies || data.dependencies) {
    mdBody += `## Details  
`;
  }
  if (data.features) {
    mdBody += `### Features  
${data.features}  
`;
  }
  if (data.technologies) {
    mdBody += `### Technologies  
${data.technologies}  
`;
  }
  if (data.dependencies) {
    mdBody += `### Dependencies  
${data.dependencies}  
  
----  
  `;
  }
  if (data.installation) {
    mdBody += `  
## Installation  
${data.installation}  
`;
  }
  if (data.usage) {
    mdBody += `## Usage  
${data.usage}  
  
----  
  `;
  }
  if (data.contributing) {
    mdBody += `## Contributing  
${data.contributing}  
`;
  }
  if (data.tests) {
    mdBody += `## Tests  
${data.tests}  
`;
  }
  if (data.github || data.email) {
    mdBody += `## Questions  
  
>Got questions? Reach out to me at:  
`;
  }

  if (data.github) {
    mdBody += `>My [Github](https://github.com/${data.github})  
`;
  }

  if (data.email) {
    mdBody += `>Email: [${data.email}](mailto:${data.email})  
  
----  
  `;
  }

  mdBody += `## Credits  
### Authors  
${data.authors}  
`;
  if (data.credits) {
    mdBody += `### Resources  
${data.credits}  
`;
  }

  let finMd = (mdTop += mdBody);

  return finMd;
}

module.exports = generateMarkdown;
