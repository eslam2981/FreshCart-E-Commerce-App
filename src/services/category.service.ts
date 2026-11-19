const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

export default async function getAllCategories(limit?: number) {
  try {
    const data = await fetch(
      `${BASE_URL}/api/v1/categories${limit ? `?limit=${limit}` : ""}`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 30,
        },
      }
    );

    if (!data.ok) {
      return { data: [] };
    }

    return data.json();
  } catch {
    return { data: [] };
  }
}

export async function getSingleCategory(id: string) {
  const res = await fetch(`${BASE_URL}/api/v1/categories/${id}`, {
    next: {
      revalidate: 60 * 60 * 24 * 30,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  const result = await res.json();
  return result.data;
}

export async function getSubcategories(categoryId: string) {
  const res = await fetch(
    `${BASE_URL}/api/v1/categories/${categoryId}/subcategories`,
    {
      next: {
        revalidate: 60 * 60 * 24 * 30,
      },
    }
  );

  if (!res.ok) {
    return [];
  }

  const result = await res.json();
  return result.data || [];
}

export async function getAllSubcategories(limit?: number) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/subcategories${limit ? `?limit=${limit}` : ""}`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 30,
        },
      }
    );

    if (!res.ok) {
      return { data: [] };
    }

    return res.json();
  } catch {
    return { data: [] };
  }
}

export async function getSingleSubcategory(id: string) {
  const res = await fetch(`${BASE_URL}/api/v1/subcategories/${id}`, {
    next: {
      revalidate: 60 * 60 * 24 * 30,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch subcategory");
  }

  const result = await res.json();
  return result.data;
}
