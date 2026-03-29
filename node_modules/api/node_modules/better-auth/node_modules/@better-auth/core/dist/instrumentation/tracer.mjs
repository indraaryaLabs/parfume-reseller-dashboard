import { SpanStatusCode, trace } from "@opentelemetry/api";

//#region src/instrumentation/tracer.ts
const tracer = trace.getTracer("better-auth", "1.5.6");
function withSpan(name, attributes, fn) {
	return tracer.startActiveSpan(name, { attributes }, (span) => {
		try {
			const result = fn();
			if (result instanceof Promise) return result.then((value) => {
				span.end();
				return value;
			}).catch((err) => {
				span.recordException(err);
				span.setStatus({
					code: SpanStatusCode.ERROR,
					message: String(err.message ?? err)
				});
				span.end();
				throw err;
			});
			span.end();
			return result;
		} catch (err) {
			span.recordException(err);
			span.setStatus({
				code: SpanStatusCode.ERROR,
				message: String(err?.message ?? err)
			});
			span.end();
			throw err;
		}
	});
}

//#endregion
export { withSpan };
//# sourceMappingURL=tracer.mjs.map