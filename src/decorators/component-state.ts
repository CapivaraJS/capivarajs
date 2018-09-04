export interface OnInit {
  $onInit(): void;
}

export interface OnViewInit {
  $onViewInit(): void;
}

export interface OnChanges {
  $onChanges(): void;
}

export interface OnDestroy {
  $onDestroy(): void;
}

export interface Bindings {
  $bindings: any;
}

export interface Functions {
  $functions: any;
}

export interface Constants {
  $constants: any;
}
