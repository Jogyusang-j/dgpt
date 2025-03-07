/**
 * Defined some of the common types
 */
type ReactNode = import("react").ReactNode;
type ReactChild = import("react").ReactChild;
type ReactChildren = import("react").ReactChildren;
type Component = import("react").Component;
type TFunction = () => void;
type TObject = Record<string, number, string, undefined, boolean, TFunction>;
type TArrayOfObjects = Array<string, TObject>;
type TNumberOrString = number | string;
type TFunctionOrObject = TFunction | TObject;
type allAnyTypes =
  | TObject
  | TFunction
  | boolean
  | isTypeUndefined
  | string
  | number
  | Array
  | isTypeNull;

type TDispatch = import("../store/index").AppDispatch;
type TReduxState = import("../store/index").ReduxState;

interface IHttpRequestOptions {
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
}

interface IActionOptions {
  dispatch?: TDispatch;
  state: TReduxState;
}

interface IPrepareResponse<T> {
  data: any;
  error: boolean;
  statusCode: number;
  statusText: string;
  statusMessage?: T;
  totalCount?: number;
}
interface ValidationStatesApp {
  suggestedQuestions: {
    isLoading: boolean;
    error: string | null;
  };
}

interface ValidationStatesAuth {
  login: {
    isLoading: boolean;
    error: string | null;
  };
}
interface ValidationState {
  isVisible: boolean;
}

interface IQuestions {
  question?: String;
}

interface IAppEntities {
  todayQuestions: IQuestions | [] | null;
}

interface AppFeatureData {
  baseUrl: string;
  isSidebarVisible: boolean;
  isContactVisible: boolean;
}

interface AuthFeatureData {
  rememberMe?: boolean;
  language: string;
}

interface IAppFeature {
  data: AppFeatureData;
  validationStates: ValidationStatesApp;
}

interface IAuthFeature {
  data: AuthFeatureData;
  validationStates: ValidationStatesAuth;
}

interface IChatDataPagination {
  page: number;
  pageSize: number;
  pageCount: number;
}
interface IChatFeature {
  data: IChatDataPagination;
}
interface User {
  name: string;
  email: string;
}

interface IAuthEntities {
  data: User | null;
  givenEmailForPasswordRecovery?: {
    email?: string;
    redirect_url?: string;
  };
}

interface Data {
  message: string;
  type: string;
}

interface IAlert {
  data: Data;
  validationStates: ValidationState;
}

interface AlertWrapperProps {
  children: React.ReactNode;
}

interface ITableComponent {
  tableData: any;
  itemType: number;
  showPagination?: boolean;
  pageCount?: TObject;
  page?: TObject;
  pageSize?: TObject;
  handlePageChange?: TObject;
  onClick?: (data: any) => void;
  onRemove?: (data: any) => void;
  onExpand?: (data: any, index: any) => void;
}

interface IChatHistory {
  data: any;
  onClick?: (data: any) => void;
  onRemove?: (data: any) => void;
}

interface IChatMenuProps {
  onRemoveClick: any;
  deleteAll: boolean;
  isDisabled?: boolean;
}

interface IFAQItem {
  data: IFaqs;
  index?: any;
  onExpand?: (data: any, index: any) => void;
}

interface ICustomViewProps {
  title: string;
  description?: string;
  titleSize?: string;
  descriptionSize?: string;
  titleWeight?: number;
  descriptionWeight?: number;
  lastUpdate?: string;
  tableContent?: any[];
}

interface ITableContent {
  tableContent?: any[];
}

interface PaginateProps {
  page: number;
  count: number;
  pageSize: number;
  margin?: number;
  onPageChange: (page: number) => any;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "solid" | "ghost" | "outline" | "link";
  selectedVariant?: "solid" | "ghost" | "outline" | "link";
  previousIcon?: React.ReactElement;
  nextIcon?: React.ReactElement;
  colorScheme?: string;
  isRtl?: boolean;
  fontWeight?:
    | "hairline"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  borderRadius?:
    | "none"
    | "sm"
    | "base"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "full";
}

interface IProfileTab {
  selectedProfile: string;
  onSelectProfile: (profileType: string) => void;
}

interface IContactUs {
  isOpen: boolean;
  onClose?: any;
}

interface ISideMenu {
  isOpen?: boolean;
}

interface ISignup {
  email: string;
  password: string;
  username: string;
}

interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
interface IPrepareResponse<T> {
  data: any;
  error: boolean;
  statusCode: number;
  statusText: string;
  statusMessage?: T;
  totalCount?: number;
}
interface IChatContainer {
  threadId?: string | number | undefined;
}
interface ICurrentChat {
  role: "user" | "assistent";
  data: any;
  id: number;
}

interface IThreadHistoryCard {
  id: number;
  threadId: number;
  userId: number;
  question: string;
  answer: string;
  createdAt: Data;
  updatedAt: Data;
}
interface IThreadHistoryChat {
  id: number;
  threadId: number;
  userId: number;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}
interface IQuestion {
  question?: string;
  totalCount?: number;
}

interface IFaqs {
  question?: string;
  answer?: string;
  isExpended?: boolean;
}

interface ISuggestedQuestionItem {
  data: IQuestion;
  onClick?: (data: any) => void;
}

interface HorizontalListProps {
  data?: any[];
  itemType: number;
  onClick?: (data: any) => void;
}

interface CenteredMessageProps {
  message: string;
}

interface ILoader {
  size?: string;
  color?: string;
  mt?: string;
  thickness?: string;
}

interface IScrollPagination {
  data?: any[];
  fetch?: Fn;
  child?: any;
  hasMore?: boolean;
  submitHandler?: any;
}

interface IChat {
  chat?: any;
  message?: string;
  loading?: boolean;
  setPopupImage?: any;
  onRetryHandler?: any;
  setPopupImageDownload?: any;
}

interface MenuItemProps {
  icon?: React.FC<{ color?: string }>;
  label: string;
  onClick?: (type: number | undefined) => void;
  type?: number;
}

interface IHeading extends FlexProps {
  mb?: any;
  index?: number;
  text?: string;
  showDownloadButton?: boolean;
  loading?: boolean;
  hideAvatar?: boolean;
  fileDownloadHandle: (type: number) => void;
}
