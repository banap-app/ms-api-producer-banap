export interface UseCase<IN, OUT> {
  execute(aCommand: IN): Promise<OUT>;
}
