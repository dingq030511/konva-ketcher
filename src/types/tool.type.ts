export type ToolName = 'select' | 'atom';

export type ToolSelectOpts = {
  type: 0 | 1;
};

export type ToolAtomOpts = {
  type: 0 | 1;
  label: string;
};

export type ToolOpts = ToolSelectOpts | ToolAtomOpts;

export type ToolType =
  | {
      name: 'select';
      opts: ToolSelectOpts;
    }
  | {
      name: 'atom';
      opts: ToolAtomOpts;
    };
