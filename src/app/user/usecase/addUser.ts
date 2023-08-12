// require model
import AppError from '../../../lib/error/AppError'
import UserModel from '../Users'
import httpStatus from '../../../config/httpStatus';

export default function makeAddUser({}) {
  return async ({userInfo}) => {
    if(!userInfo) throw new AppError('Cannot create user. Missing fields', httpStatus.BAD_REQUEST);
    const {email, password} = userInfo; 
    const exist = await UserModel.findOne({email})
    if(exist) throw new AppError('Email already exists', httpStatus.CONFLICT)

    const created = await UserModel.create({email, password})
    return created
  }
}