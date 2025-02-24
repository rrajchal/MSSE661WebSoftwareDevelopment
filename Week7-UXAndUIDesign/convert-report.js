const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const builder = require('junit-report-builder');

// Path to the JUnit XML report
const reportPath = path.join(__dirname, 'reports', 'Test_Results.xml');

// Read the JUnit XML report
fs.readFile(reportPath, 'utf8', (err, data) => {
    if (err) {
        return console.error(`Failed to read JUnit XML report: ${err.message}`);
    }

    // Parse the XML report
    xml2js.parseString(data, (err, result) => {
        if (err) {
            return console.error(`Failed to parse JUnit XML report: ${err.message}`);
        }

        // Create a new HTML report
        const suite = builder.testSuite().name(result.testsuites.testsuite[0].$.name);
        result.testsuites.testsuite.forEach(testsuite => {
            testsuite.testcase.forEach(testcase => {
                const testCase = suite.testCase().className(testcase.$.classname).name(testcase.$.name).time(testcase.$.time);
                if (testcase.failure) {
                    testCase.failure(testcase.failure[0]._);
                }
            });
        });

        const html = builder.build();

        // Write the HTML report to a file
        const htmlReportPath = path.join(__dirname, 'reports', 'Test_Results.html');
        fs.writeFile(htmlReportPath, html, err => {
            if (err) {
                return console.error(`Failed to write HTML report: ${err.message}`);
            }
            console.log(`HTML report generated at: ${htmlReportPath}`);
        });
    });
});
