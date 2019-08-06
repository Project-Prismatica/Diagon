// flow-typed signature: 250f99f7c493cff2ea14a1508939cfad
// flow-typed version: a453e98ea2/rimraf_v2.x.x/flow_>=v0.25.0

declare module 'rimraf' {
  declare type Options = {
	  maxBusyTries?: number,
	  emfileWait?: number,
	  glob?: boolean,
	  disableGlob?: boolean
  };
  
  declare type Callback = (err: ?Error, path: ?string) => void;

  declare module.exports: {
    (f: string, opts?: Options | Callback, callback?: Callback): void;
    sync(path: string, opts?: Options): void;
  };
}
