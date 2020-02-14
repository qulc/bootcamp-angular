import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  feeds: any[];
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          query {
            feeds(first: 10) {
              edges {
                node {
                  user{
                    username
                    profile{
                      pictureUrl
                    }
                  }
                  date
                  post
                  likes
                  comments
                }
              }
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.feeds = result.data['feeds']['edges'];
      });
  }

}
