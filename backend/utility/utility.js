const selectNextMember = (members, memberIdToBeDeleted) => {
  if (members.length === 1) {
    return members[0];
  }

  const index = members.findIndex((m) => m.equals(memberIdToBeDeleted));

  if (index !== -1) {
    let nextIndex = (index + 1) % members.length;
    return members[nextIndex];
  }

  return null;
};

module.exports = {
  selectNextMember,
};
