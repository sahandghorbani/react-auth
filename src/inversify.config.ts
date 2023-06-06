import "reflect-metadata";
import { Container } from "inversify";
import { GetStateService, SetDispatchService } from "./services";
import { IGetState, ISetDispatch } from "./interface";

export const dependencies = {
  IGetState: Symbol.for("IGetState"),
  ISetDispatch: Symbol.for("ISetDispatch")
};

const container = new Container();
container.bind<IGetState>(Symbol.for("IGetState")).to(GetStateService);
container.bind<ISetDispatch>(Symbol.for("ISetDispatch")).to(SetDispatchService);
export { container };
