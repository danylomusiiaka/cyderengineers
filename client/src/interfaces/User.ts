interface CompletedTest {
  testId: string;
  result: string;
}

export interface User {
  email: string;
  createdAt: string;
  completed_tests: CompletedTest[];
}
