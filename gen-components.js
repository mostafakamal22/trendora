import { exec } from "child_process";

const components = process.argv.slice(2);

if (components.length === 0) {
  console.log("Please provide at least one component name.");
  process.exit(1);
}

components.forEach((component) => {
  exec(
    `npx generate-react-cli component ${component}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`Error generating ${component}:`, stderr);
      } else {
        console.log(stdout);
      }
    }
  );
});
