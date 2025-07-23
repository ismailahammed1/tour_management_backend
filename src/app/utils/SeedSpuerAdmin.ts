import { envVars } from "../config/env";
import { AuthProviderType, IAuthProviver, Iuser, Role } from "../module/user/user.interface";
import { User } from "../module/user/user.model";
import bcryptjs from "bcryptjs";

export const superAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin already exists");
      return;
    }

    console.log("Trying to create Super Admin...");

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWROD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const authProvider: IAuthProviver = {
      provider:AuthProviderType.CREDENTIAL,
      providerID: envVars.SUPER_ADMIN_EMAIL,
    };

    const payload: Iuser = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider], // assuming auths is IAuthProviver[]
    };

    const superadmin = await User.create(payload);
    console.log("Super Admin created successfully!");
    console.log(superadmin);
  } catch (error) {
    console.error("Failed to create Super Admin:", error);
  }
};
