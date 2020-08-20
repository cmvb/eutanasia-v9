package com.eutanasia.eutanasia.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eutanasia.eutanasia.dao.IPostsDao;
import com.eutanasia.eutanasia.model.PostTB;
import com.eutanasia.eutanasia.service.IContactsService;

@Service
public class ContactsServiceImpl implements IContactsService {

	@Autowired
	private IPostsDao contactsDAO;

	@Transactional
	@Override
	public PostTB crear(PostTB contact) {
		return contactsDAO.crear(contact);
	}

}
