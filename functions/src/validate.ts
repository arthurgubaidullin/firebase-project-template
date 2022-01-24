import * as E from "fp-ts/Either";
import { flow } from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray";
import * as t from "io-ts";
import { failure } from "io-ts/PathReporter";
import { ValidationError } from "./ValidationError";

export function validate<I, A>(
  codec: t.Decoder<I, A>
): (i: I) => E.Either<readonly ValidationError[], A> {
  return flow(
    codec.decode,
    E.mapLeft(failure),
    E.mapLeft(A.map((e) => new ValidationError(e)))
  );
}
