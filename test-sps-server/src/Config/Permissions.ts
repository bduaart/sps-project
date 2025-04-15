export const permissions = {
  admin: {
    user: ["create", "read", "update", "delete"],
  },
  user: {
    user: ["create", "read", "update"],
  },
};

export type RoleType = keyof typeof permissions;
export type Resource = keyof (typeof permissions)[RoleType];
export type Action = "create" | "read" | "update" | "delete";
