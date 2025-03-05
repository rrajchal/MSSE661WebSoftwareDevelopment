import JasmineConsoleReporter from 'jasmine-console-reporter';
import JasmineReporters from 'jasmine-reporters';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import db from './../db-config.js';
import { getAllTasks } from '../src/controller/tasks.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up the reporters within the test file
const reportsDir = path.join(__dirname, '..', '..', 'reports');
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
}

const consoleReporter = new JasmineConsoleReporter({
    colors: 1,
    cleanStack: 1,
    verbosity: 4,
    listStyle: 'indent',
    activity: false,
    emoji: true,
    beep: true
});

const junitReporter = new JasmineReporters.JUnitXmlReporter({
    savePath: reportsDir,
    consolidateAll: false,
    filePrefix: 'Test_Results',
    modifyReportFileName: (generatedFileName, suiteName, filePath) => {
      return '';
    }
});

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(consoleReporter);
jasmine.getEnv().addReporter(junitReporter);

describe("Sample Test Suite", () => {
  beforeEach(() => {
    spyOn(db, 'query');
  });

  afterEach(() => {
    db.query.calls.reset();
  });

  it("should run a simple test", () => {
    expect(true).toBe(true);
  });

  describe("getAllTasks", () => {
    it("should return all tasks", (done) => {
      const mockTasks = [{ id: 1, description: "Task 1", completed: false }];
      db.query.and.callFake((query, callback) => {
        callback(null, mockTasks);
      });

      const req = {};
      const res = {
        status: jasmine.createSpy('status').and.callFake(() => res),
        json: jasmine.createSpy('json'),
      };

      getAllTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTasks);
      done();
    });
  });
});
